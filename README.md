# Authentication
Authentication is the process of making sure someone is who they say they are. In terms of web devlopment this involves working with information such as emails and passwords.

When working authentication there are a few questions you should be able to answer:
1. Do I have a place to store user information(database table)?
2. Do I have a place for a user to give this information(A component with inputs for email and password, generally)?
3. Do I have a way to place user information in the database, and hash passwords(Done through SQL queries and bcryptjs)?
4. Am I making sure users can't make duplicate accounts?
5. Am I placing the user on a session, and sending the session client-side?

Review the code in the authCtrl.js file. This file contains comments that will help you know how to ensure you are doing these five things.

# Redux

Redux is a state-management tool. State management tools are designed to make sharing state values easier between many components. While not a total replacement of local state in components, Redux is particularly useful in a couple ways:

1. Making data that needs to be shared across multiple components much easier to access than the normal passing of props.
2. Making data available to components from different routes.

When working with Redux in a React application, you will find React-Redux useful. Remember, Redux will help you build your reducer and store files, where React-Redux is only for connecting(subscribing) components to state values and actions found in your reducer files.

## Reducers

Reducers should three things:

1. initialState
2. reducer function
3. Action creators

## Store

Store files will bundle your reducers in to one location and make them available to your application.

1. import createStore from redux
2. import reducer file(s)
3. invoke createStore, passing the reducer(s)


# React-Redux

React-redux helps us subscribe components to our reduxState.

Subscribing means:
1. Accessing state items from redux
2. Accessing actions from redux

How we subscribe components:
1. Provider
2. connect
3. mapStateToProps
4. mapDispatchToProps (making actions props)

View src/index.js to learn more about the Provider component, and view src/Components/Wizard/Step1.js to view connect, mapStateToProps, and making actions props.