# Troubleshooting

- after every workspace-level change such as folder structure changes or project configuration changes (including project name changes), please:
  - reinitialize the `package-lock.json`
  - reset the Nx daemon

## 1. Reinitialize `package-lock.json`
- remove the `package-lock.json` file
- `$ rm package-lock.json`

## 2. Reset Nx Daemon
- reset Nx Daemon
- `$ npx nx reset`

## Check Nx Graph
- once you did the above-mentioned steps, you can verify that the changes were correctly applied by running:

- `$ npx nx graph`
