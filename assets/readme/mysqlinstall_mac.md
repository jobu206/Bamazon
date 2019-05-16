# MySQL Install

## For Mac:

```
brew uninstall mysql
rm -rf /usr/local/var/mysql
rm /usr/local/etc/my.cnf
brew install mysql@5.7
brew link --force mysql@5.7
```

Start the server:

```
brew services start mysql@5.7
```

Check your client-server connection:

```
mysql -u root
```

Disconnect (while in mysql):

```
exit
```

Add a root password:

```
mysql_secure_installation
```

When it asks: don't allow root to log in remotely, remove the test database and yes reload the privileges table