# Action Item Manager

## Brief overview

Our project is an **action item manager** that facilitates task management for any organization. An organization 
contains a list of **admins** and **users**, and may have any number of **teams**. Each team may be assigned one **manager**
by an admin, which may be an admin or a regular user. Users may be members of multiple teams. Each team has
a list of action items (tasks) assigned to all members of the team, which individual team members can
mark as complete or incomplete.

## Login credentials

To log in as an `admin`, use username **admin** and password **admin**. To log in as a regular user, use
username/password **user**/**user**, **user2**/**user2**, **user3**/**user3** or **user4**/**user4**. The views
for each user differs based on which team(s) they're part of, and whether they are the manager of said team(s).

The following table illustrates the structure of teams & users hardcoded into the code as part of Phase 1.
A blank cell indicates that the user in that row is not part of the team represented by that column.

&nbsp; | Team 1 | Team 2
--- | --- | ---
admin | member | &nbsp;
user1 | **manager** | member
user2 | member | **manager**
user3 | member | &nbsp;
user4 | &nbsp; | member

## Features for all users

### Login authentication
All users will be able to login when first visiting the website using their email and preferred password. If the user was recently invited to be a user on the website, they must enter the password 'admin' and change their password once logged in.

### Viewing list of all action items

All Users can view a list of all their assigned action items regardless of team in the **Action Items** tab.
Each action item on the list is represented as a panel which display its title, due date and status
(completed or incomplete). The list is sorted by date (most recent first).

### Viewing action items by team

All Users can view their assigned action items by team by clicking the **Teams** tab, and clicking the team
they wish to view action items for. All users (including admins) can only see action items for 
teams which they are a part of.

### Marking action items as complete

All users can mark any action items assigned to them as complete or incomplete on the individual page for
the action item itself. This page can be reached by clicking on an action item on either the list of all
action items, or the list of action items for some team the user is part of. The new status will then be reflected
across the system (on the individual item view or list views).

### Editing profile and changing password
All users can view their account information in the **Account Info** tab. Their first name, last name, email and role will be displayed.
Users can also change their password by clicking the **Edit Password** button in the Account Info page, filling a new password in the
input box and clicking Submit. Clicking the Cancel button will redirect back to the Account Info page. Users can change their profile
information via the **Edit Profile** button. First name, last name, and email can be changed by inputting new names and emails and clicking
the Submit button. Leaving any field unchanged will keep the information as it currently is. The Cancel button will redirect back to
the Account Info page.

## Features for team managers

### Editing action items

Team managers are able to change the title, description, and due date for any action item assigned to their
team. This is done by navigating to the individual action item page and clicking **Edit Action Item**. The new 
title/description/due date will then be reflected across the system.

### Viewing status of action item for all team members

Team managers are able to see an additional piece of information for action items belonging to their team. On
an action item page, there is a box displaying **Completed by x/y members**, where x is the number of team members
who have marked this item as complete, and y is the size of the team. This label is also clickable. Managers can click
onto the label to see more details on the users that have completed the action item.

### Creating new action items

Team managers are able to create new action items for their teams. They can set the title, description and due date on 
creation. To create a new Action Item, navigate to **Teams > Team Name > Create Action Item**, fill out the information and assign 
it to the team. The new action item will default to Incomplete and can be found in the **Action Items** tab.

### Deleting action items

Team managers are able to delete existing action items. When viewing action items for a specific team, there is a 
delete button allowing managers to remove action items from the system.

### Adding and removing members from the team

Team managers are able to manage their teams in the **Teams** tab. Navigate to the desired team, and choose **Manage Team**.
There, managers can choose to add new users to their team by using the dropdown and clicking Add User. Likewise, 
they can view a list of current team members, and remove a member by clicking the remove button next to their name.

## Features for admins

Admins have access to an additional page through the **Admin Page** tab, which contains all administrative functionality.
In addition, they are able to create action items, add/remove users from teams, and view the status for any action item for
every team. 

### Adding and removing teams from the organization

Admins are able to view a list of all teams in the admin page, where they can remove any existing team by clicking **Disband**,
and create a new team by filling out the form below the **Teams** table and clicking Create Team, with the new team's manager selected through the dropdown menu. If no new manager is selected, the team is created with the currently signed in user as
the manager.

### Selecting team managers

Admins are able to set the manager for any team in the organization from the pool of users in the organization using the dropdown menu in the **Team Manager** column. The currently set manager for a team is shown as the default value, and is absent from the dropdown list. If a user is selected as a manager of a team they are not currently a part of, they are added to that team as that
team's manager, which is reflected across the system (in **Teams**).

### Inviting and removing users from the organization
Admins are able to invite users to the organization using their email. Admins will be able to specify their role (User or Admin), and their first name and last name.
Invited users will then be able to login with their email and password 'admin'. Users will be able to change their password using the change password functionality described above.


## How to run the app

### Deployed version
Visit the [site](https://pacific-atoll-01415.herokuapp.com/) deployed on Heroku.

### Set up on local machine

This project was written using React and Node.js. To run the app locally, from the root directory, run:

### `cd action-item-manager`
### `npm install`
### `npm run build`

to navigate to the action-item-manager directory, install the required packages and build the app, next, run:

### `cd ../login-page`
### `npm install`
### `npm run build`

to do the same for the login page, then, run:

### `cd ..`
### `npm start`

to navigate to the root directory and start the server on [localhost:3001](localhost:3001)

You will also have to initialize a mongo database locally.