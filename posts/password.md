Change Linux password
=====================

I've been logged out by Jumpcloud while working on MURAL.
This is a series of steps that let me change my password, and bypass Ubuntu's login screen:

- On GRUB, select **Advanced options for Ubuntu**
- Start Ubuntu in recovery mode (any option)
- On recovery mode, choose **root** (Drop to root shell prompt)
- Run `mount -rw -o remount /` to remount root with write access
- Run `ls /home` to check usernames (folders inside)
- Run `passwd [username]` where usernames is one of the previous usernames
- Enter a new password
- Run `exit`, and init in recovery or reboot, the password will be updated now

Happy pass recovering!