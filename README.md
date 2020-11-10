# Anigami bot

<div align='center'>

In this change you need to install Mysql in order to make the bot run.

STEP 1: run install command

```
sudo apt update
sudo apt install mysql-server
sudo systemctl status mysql
```

if u run the third code, and the output have active color green then you will be good.

STEP 2: create root user
```
mysql
```

the trigger will transform to "mysql>" then use

```
CREATE USER ‘new_user’@’localhost’ IDENTIFIED BY ‘password’;
```

then

```
GRANT ALL PRIVILEGES ON * . * TO 'new_user'@'localhost' IDENTIFIED BY 'password';

```
Finally

```
FLUSH PRIVILEGES;
```

STEP 3:

```
mysql
CREATE DATABASE IF NOT EXISTS database_name;
use database_name;
```

then copy everything bellow and enter!

```
CREATE TABLE IF NOT EXISTS USERDATA(
    DISCORDID BIGINT,
    MORA INT,
    RESIN INT,
    DATA BLOB
);
```

check output

```
DESCRIBE table_name;
```
if u saw DISCORDID BIGINT, MORA INT, RESIN INT, DATA BLOB then u good.



Finally config the credentials.js file.
