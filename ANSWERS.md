<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
sessions allow the user to be authenticated for multiple requests, so they don't need to log in every time a request is sent

2. What does bcrypt do to help us store passwords in a secure manner.
Bcrypt hashes the passwords so that the server doesn't actually know what the passwords are, but only sees the hashes

3. What does bcrypt do to slow down attackers?
Bcrypt can hash the password, then hash that hash and so on many times to make recovering the original password harder.

4. What are the three parts of the JSON Web Token?
Header, payload, & signature.
