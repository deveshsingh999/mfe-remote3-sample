# Microfrontend 1

## Steps to create another microfrontend from base remote mfe setup
1. Copy all contents inside base remote mfe setup `mfe-remote1` into another folder, say `mfe-remote2`
2. In the file `env/.env`, update the value of `MFE_NAME` environment variable, say from `remote1` to `remote2`
3. Set the appropriate values for `MFE_PUBLIC_PATH` environment variable in the files `env/.env.dev` and `env/.env.prod` for _dev_ and _prod_ environments respectively. (Please use appropriate port, say `3002`, for this particular remote microfrontend)
4. In the `start` and `dev` npm scripts in `package.json` file, use the appropriate port for this particular remote microfrontend, e.g. `3002`
5. In the `build:app` npm script in `package.json` file, use the appropriate destination directory for Nginx, e.g. `/var/www/mfe-remote2/dist` (NOTE: replace at 2 places)

## Nginx config
```
server {
        listen 3002;
        listen [::]:3002;

        #server_name remote2.example.com;

        root /var/www/mfe-remote2/dist;
        index index.html;

        location ^~ / {
                try_files $uri $uri/ $uri.html /index.html =404;
        }
}
```
