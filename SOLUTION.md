## Part 2: Subscription Renewal Reminder Automation

To automate subscription renewal reminders, I would set up a simple scheduled process that runs daily.

### Approach

- A scheduled job, such as a cron job, would run once per day.
- It would check the database for members whose `subscriptionExpiresAt` date is within the next 21 days.
- Only members with an active subscription would be included.
- The system would check whether a reminder has already been sent to avoid duplicates.

### Sending Notifications

- For each eligible member, the system would send a reminder email using an email service provider (e.g. SendGrid or similar).
- The email would include details about the upcoming expiry and instructions to renew.

### Tracking Reminders

- A simple log table (e.g. `RenewalReminderLog`) could be used to store:
  - memberId
  - reminderSentAt
- This ensures reminders are only sent once per cycle.

### Office Manager Visibility

- A basic admin view or report could be added to show:
  - which members are due for renewal
  - which reminders have already been sent

### Summary

This approach keeps the system simple, reliable, and easy to maintain, while ensuring members are notified in advance of their subscription expiry.




---

## Part 3: Security and Handover

### 3a. Data Security

The most important security considerations I would focus on from the start are authentication and access control, protecting sensitive data, and making sure the system can be monitored and recovered if something goes wrong.

#### 1. Authentication and access control
This system stores personal member information, so the first priority is making sure only the right people can access it.

What I would do:
- require secure login for staff and members
- store passwords using a strong one-way hash such as bcrypt
- use role-based access control so members can only see their own data, while office staff can manage member records and event registrations
- protect admin routes so they are not publicly accessible
- add session expiry and secure cookie or token handling

#### 2. Protection of sensitive data
The system contains names, email addresses, and payment-related information, so protecting data in transit and at rest is essential.

What I would do:
- run the system only over HTTPS
- keep secrets in environment variables and never commit them to the repository
- minimise stored payment data and avoid storing full card details directly in the app
- restrict database access so only the application and authorised admins can connect
- validate and sanitise input to reduce the risk of common attacks such as injection or malformed requests

#### 3. Auditability, backups, and recovery
For a small team, accidental changes or data loss could cause major problems, so the system should make it easy to trace changes and recover quickly.

What I would do:
- log important actions such as member updates, event registrations, and renewal reminder sends
- create regular automated database backups
- document a simple restore process so the team knows how to recover data
- monitor for failed login attempts or suspicious activity
- keep dependencies updated to reduce avoidable security risk

### 3b. Handover

A good handover should make the system easy to run and understand without relying on the original developer.

A good handover would include:

#### 1. A simple user guide
A short guide showing:
- how to start the system
- how to view member information
- how event registrations work
- what common errors mean
- what to do if something stops working

#### 2. Clear setup and environment notes
This should include:
- where the code is hosted
- how to install dependencies
- how to run the app
- what environment variables are needed
- where the database lives
- how backups are handled

#### 3. Admin and support notes
This should explain:
- which tasks the office manager can do safely
- which tasks need a developer
- how to add future team members
- how to reset access if needed
- who to contact for technical support

#### 4. Walkthrough and knowledge transfer
I would also include a short recorded walkthrough or live handover session covering:
- how the system is structured
- how to run the main workflows
- where common issues are likely to happen
- how to check logs or data if something looks wrong

### Summary

The goal of the handover is not just to deliver code. It is to leave behind a system that the client can operate confidently day to day, with clear documentation, clear boundaries, and a simple recovery path if something goes wrong.
