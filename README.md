# Authentication
Authentication is the process of making sure someone is who they say they are. In terms of web devlopment this involves working with information such as emails and passwords.

When working authentication there are a few questions you should be able to answer:
1. Do I have a place to store user information(database table)?
2. Do I have a place for a user to give this information(A component with inputs for email and password, generally)?
3. Do I have a way to place user information in the database, and hash passwords(Done through SQL queries and bcryptjs)?
4. Am I making sure users can't make duplicate accounts?
5. Am I placing the user on a session, and sending the session client-side?

Review the code in the authCtrl.js file. This file contains comments that will help you know how to ensure you are doing these five things.