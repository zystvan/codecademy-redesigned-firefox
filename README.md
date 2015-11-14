# Codecademy Redesigned

## Features

Codecademy makes your experience on Codecademy much better with the following features: 

- Adds a new Canned Responses feature into the forums for people who type the same thing a lot
- Redesigns the Forums to have darker colors with more contrast, to strain the eye less 
- Adds a link in the footer to a GitHub repository containing old posts saved from Groups, including many useful tutorials.  
- Makes the notification bell link to your [Discuss][1] notifications, instead of the old notifications page
- Updates the Profile Page, adding 'points today', 'best points day', and best day streak' back into the profile.  

Enjoy the improvements, we plan on adding many more :)

## How to contribute

After you've cloned this repository to your local machine, you'll need to install jpm, through npm. Unless you already have npm installed, the recommended way is to install Node.js®, since npm comes with Node.js® automatically. You can install Node.js® from [here][2]. After you've done that, open up a terminal and type 

```bash
$ sudo npm install jpm --global
```

Now, to test your extension, you just type `jpm run -b /path/to/firefox/firefox` from the project directory. For example, on at least some Linux distributions, that would be: 

```
$ jpm run -b /usr/lib/firefox/firefox.sh
```

You can then make whatever changes you want, and preview them by re-running the command above (`jpm run -b...`). 

[1]: http://discuss.codecademy.com
[2]: https://nodejs.org