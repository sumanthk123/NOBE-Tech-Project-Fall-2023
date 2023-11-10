test_num = 5

# Params
BATCH_SIZE = 128
EPOCHS = 15
LEARNING_RATE = 1.0
OPTIM_GAMMA = 0.7

test_name = f'Run {test_num}: {EPOCHS} Epochs, {BATCH_SIZE} Batch Size'
# Define NN
import torch
import torch.nn as nn
import torch.nn.functional as f
import matplotlib.pyplot as plt


class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 4, 1)
        self.conv2 = nn.Conv2d(32, 64, 4, 1)
        self.dropout1 = nn.Dropout(0.25)
        self.dropout2 = nn.Dropout(0.5)
        self.fc1 = nn.Linear(28224, 441)
        self.fc2 = nn.Linear(441, 7)

    def forward(self, x):
        x = self.conv1(x)
        x = f.relu(x)
        x = self.conv2(x)
        x = f.relu(x)
        x = f.max_pool2d(x, 2)
        x = self.dropout1(x)
        x = torch.flatten(x, 1)
        x = self.fc1(x)
        x = f.relu(x)
        x = self.dropout2(x)
        x = self.fc2(x)
        out = f.log_softmax(x, dim=1)
        return out


# %%
# Load the Data
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

transform = transforms.Compose([transforms.Grayscale(num_output_channels=1),
                                transforms.ToTensor(),
                                transforms.Normalize(0.5086, 0.2549)])
train_dataset = datasets.ImageFolder(root='train',
                                     transform=transform)
test_dataset = datasets.ImageFolder(root='validation',
                                    transform=transform)

train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=BATCH_SIZE, shuffle=False)

# Initialize Model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = Net().to(device)

# Train Model
import torch.optim as optim
from torch.optim.lr_scheduler import StepLR


def train(model, train_loader, optimizer, device):
    model.train()
    running_loss = 0
    count = 0
    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device), target.to(device)
        optimizer.zero_grad()
        output = model(data)
        loss = f.nll_loss(output, target)
        running_loss += loss
        count += 1
        loss.backward()
        optimizer.step()
    return running_loss / count


def test(model, test_loader, device):
    model.eval()
    test_loss = 0
    correct = 0
    with torch.no_grad():
        for data, target in test_loader:
            data, target = data.to(device), target.to(device)
            output = model(data)
            test_loss += f.nll_loss(output, target, reduction='sum').item()  # sum up batch loss
            pred = output.argmax(dim=1, keepdim=True)  # get the index of the max log-probability
            correct += pred.eq(target.view_as(pred)).sum().item()

    test_loss /= len(test_loader.dataset)

    print('\nTest set: Average loss: {:.4f}, Accuracy: {}/{} ({:.0f}%)\n'.format(
        test_loss, correct, len(test_loader.dataset),
        100. * correct / len(test_loader.dataset)))

    # Matplotlib
    return 100. * correct / len(test_loader.dataset)


optimizer = optim.Adadelta(model.parameters(), lr=LEARNING_RATE)
scheduler = StepLR(optimizer, step_size=1, gamma=OPTIM_GAMMA)

print(f'Training on: {device}')

print(torch.cuda.is_available())

print(torch.cuda.device_count())

# Matplotlib Arrays
epochs_arr = list(range(1, EPOCHS + 1))
loss_arr = []
acc_arr = []

for i in range(1, EPOCHS + 1):
    loss_arr.append(train(model, train_loader, optimizer, device).detach().cpu())
    acc_arr.append(test(model, test_loader, device))
    scheduler.step()

# Save Model

def save_model(_model, _test_num, _epochs_arr, _loss_arr, _acc_arr):
    torch.save(_model, f'modelv{_test_num}.pt')
    plt.scatter(_epochs_arr, loss_arr)
    plt.savefig(f'v{_test_num}_loss')
    plt.show()
    plt.scatter(_epochs_arr, _acc_arr)
    plt.savefig(f'v{_test_num}_accuracy')
    plt.show()

save_model(model, test_num, epochs_arr, loss_arr, acc_arr)

