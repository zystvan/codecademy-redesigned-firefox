# Codecademy Redesigned

## Features

**Restyles the Codecademy forums and adds several new features, as well as fixing a few of the bugs on Codecademy**

This extension combines several previous extensions and completely revolutionizes your experience on Codecademy. This extension does the following:

\- Restyles the Q&A Forums making them fit in seamlessly with the new UI, rather than the old clunky look and feel of the forum pages.  
\- Lets you link to a specific response or comment in the Q&A forums by clicking the time stamp.  
\- Adds the correct exercise number into Q&A question pages (previously broken). Many thanks to [Joah Gerstenberg](https://www.joahg.com) who built the original extension to do this.  
\- Partially fixes the forum search, giving you the ability to search throught the posts shown.  
\- Adds a link in the footer to a GitHub repository containing old posts saved from Groups, including many useful tutorials.  
\- Shows the number of unread notifications in the tab title and uses Desktop Notifications to alert you when there's a new one.  
\- Updates the Profile Page, adding 'points today', 'best points day', and best day streak' back into the profile.  

Enjoy the improvements, we plan on adding many more :)

## How to contribute

After you've cloned this repository to your local machine, you'll need to install jpm, through npm. Unless you already have npm installed, the recommended way is to install Node.js®, since npm comes with Node.js® automatically. You can install Node.js® from [here](https://nodejs.org). After you've done that, open up a terminal and type 

```bash
$ sudo npm install jpm --global
```

Now, to test your extension, you just type `jpm run -b /path/to/firefox/firefox` from the project directory. For example, on at least some Linux distributions, that would be: 

```
$ jpm run -b /usr/lib/firefox/firefox.sh
```

You can then make whatever changes you want, and preview them by re-running the command above (`jpm run -b...`). 