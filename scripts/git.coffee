# Description:
#   Git Commit and Issues
#
# Dependencies:
#   "Git Module": "0.0.1"
#
# Configuration:
#   LIST_OF_ENV_VARS_TO_SET
#
# Commands:
#   hubot git - shows you the commit and issue_comment
#
# Notes:
#   <optional notes required for the script>
#
# Author:
#   <github username of the original script au>

LATEST_ISSUE = 'no issue'

module.exports = (robot) ->
  robot.respond /git/i, (msg) ->
    msg.send LATEST_ISSUE

  robot.on "github-repo-event", (issues) ->
         console.log("issues for issue_comment", arguments);
         if issues.eventType == 'issue_comment'
          robot.send { room: issues.query.room, event: issues.eventType }, "New Issue Comment \n" + issues.payload.issue.url + '\n' + "new comment added:  " + issues.payload.comment.body + '\n' + "commented by:  " + issues.payload.issue.user.login
          LATEST_ISSUE = "New Issue Comment  \n" + issues.payload.issue.url + '\n' + "new comment added:  " + issues.payload.comment.body + '\n' + "commented by:  " + issues.payload.issue.user.login

   robot.on "github-repo-event", (issues) ->
        console.log("issues for push", arguments);
        if issues.eventType == 'push'
         robot.send { room: issues.query.room, event: issues.eventType }, "New Event Push\n" + 'Event Pushed By: ' + issues.payload.pusher.name + '\n' + 'In Repo name: ' + issues.payload.repository.name
         LATEST_ISSUE = "New Event Push\n" + 'Event Pushed By: ' + issues.payload.pusher.name + '\n' + 'In Repo name: ' + issues.payload.repository.name

    robot.on "github-repo-event", (issues) ->
        console.log("issues for issues event", arguments);
        if issues.eventType == 'issues'
         if issues.payload.action == 'opened'
          robot.send { room: issues.query.room, event: issues.eventType },  "New Issue Opened\n " +  'The link:  ' + issues.payload.issue.url + '\n' + "Title:  " + issues.payload.issue.title + '\n' + "Issued By: " + issues.payload.issue.user.login + '\n' + "Created At: " + issues.payload.issue.created_at
          LATEST_ISSUE = "New Issue Opened\n " + 'The link:  ' + issues.payload.issue.url + '\n' + "Title:  " + issues.payload.issue.title + '\n' + "Issued By: " + issues.payload.issue.user.login + '\n' + "Created At: " + issues.payload.issue.created_at
         else if issues.payload.action == 'assigned'
          robot.send { room: issues.query.room, event: issues.eventType },  "New Issue Assigned\n " +  'The link:  ' + issues.payload.issue.url + '\n' + 'Assigned to:  ' + issues.payload.issue.assignee.login + ' ' + '\n' + "Title:  " + issues.payload.issue.title + '\n' + "Created At: " + issues.payload.issue.created_at + '\n'+ "Issued By: " + issues.payload.issue.user.login
          LATEST_ISSUE =  "New Issue Assigned\n " + 'The link:  ' + issues.payload.issue.url + '\n' + 'Assigned to:  ' + issues.payload.issue.assignee.login + ' ' + '\n' + "Title:  " + issues.payload.issue.title + '\n' + "Created At: " + issues.payload.issue.created_at + '\n'+ "Issued By: " + issues.payload.issue.user.login
         else if issues.payload.action == 'closed'
          robot.send { room: issues.query.room, event: issues.eventType },  "New Issue Closed\n " + 'The link:  ' + issues.payload.issue.url + '\n' + 'Closed :  ' + issues.payload.issue.closed_at + ' ' + '\n' + "Title:  " + issues.payload.issue.title + '\n' + "Issued By: " + issues.payload.issue.user.login
          LATEST_ISSUE =  "New Issue Closed\n " + 'The link:  ' + issues.payload.issue.url + '\n' + 'Closed :  ' + issues.payload.issue.closed_at + ' ' + '\n' + "Title:  " + issues.payload.issue.title + '\n' + "Issued By: " + issues.payload.issue.user.login
         else if issues.payload.action == 'reopened'
          robot.send { room: issues.query.room, event: issues.eventType },  "New Issue ReOpened\n " + 'The link:  ' + issues.payload.issue.url + '\n' + 'Issue :  ' + issues.payload.issue.state + ' ' + '\n' + "Title:  " + issues.payload.issue.title + '\n' + 'Updated At: ' + issues.payload.issue.updated_at + '\n' + "Issued By: " + issues.payload.issue.user.login
          LATEST_ISSUE =  "New Issue ReOpened\n " + 'The link:  ' + issues.payload.issue.url + '\n' + 'Issue :  ' + issues.payload.issue.state + ' ' + '\n' + "Title:  " + issues.payload.issue.title + '\n' + 'Updated At: ' + issues.payload.issue.updated_at + '\n' + "Issued By: " + issues.payload.issue.user.login

    robot.on "github-repo-event", (issues) ->
        console.log("issues for Pull", arguments);
        if issues.eventType == 'pull_request'
         if issues.payload.action == 'opened'
          robot.send { room: issues.query.room, event: issues.eventType },  "New Pull Opened\n " +'The link:  ' + issues.payload.pull_request.url + "\n" + "Title:  " + issues.payload.pull_request.title + '\n' +  "Issued By: " + issues.payload.pull_request.user.login + "\n" + "For Commit URL: " + issues.payload.pull_request.commits_url
          LATEST_ISSUE =  "New Pull Opened\n " + 'The link:  ' + issues.payload.pull_request.url + "\n" + "Title:  " + issues.payload.pull_request.title + '\n' +  "Issued By: " + issues.payload.pull_request.user.login + "\n" + "Created_at: " + issues.payload.pull_request.created_at  + "\n" + "For Commit URL: " + issues.payload.pull_request.commits_url
         else if issues.payload.action == 'unassigned'
          robot.send { room: issues.query.room, event: issues.eventType },  "New Pull Unassigned\n " + 'The link:  ' + issues.payload.pull_request.url + "\n" + "Assigned to:  " + issues.payload.pull_request.assignee + '\n' +  "Issued By: " + issues.payload.pull_request.user.login + "\n" + "Created_at: " + issues.payload.pull_request.created_at  + "\n" + "For Commit URL: " + issues.payload.pull_request.commits_url
          LATEST_ISSUE =  "New Pull Unassigned\n " + 'The link:  ' + issues.payload.pull_request.url + "\n" + "Assigned to:  " + issues.payload.pull_request.assignee + '\n' +  "Issued By: " + issues.payload.pull_request.user.login + "\n" + "Created_at: " + issues.payload.pull_request.created_at  + "\n" + "For Commit URL: " + issues.payload.pull_request.commits_url
         else if issues.payload.action == 'assigned'
          robot.send { room: issues.query.room, event: issues.eventType },  "New Pull Assigned\n " +'The link:  ' + issues.payload.pull_request.url + "\n" + "Assigned to:  " + issues.payload.pull_request.assignee + '\n' +  "Issued By: " + issues.payload.pull_request.user.login + "\n" + "Created_at: " + issues.payload.pull_request.created_at  + "\n" + "For Commit URL: " + issues.payload.pull_request.commits_url
          LATEST_ISSUE =  "New Pull Assigned\n " +'The link:  ' + issues.payload.pull_request.url + "\n" + "Assigned to:  " + issues.payload.pull_request.assignee + '\n' +  "Issued By: " + issues.payload.pull_request.user.login + "\n" + "Created_at: " + issues.payload.pull_request.created_at  + "\n" + "For Commit URL: " + issues.payload.pull_request.commits_url
         else if issues.payload.action == 'reopened'
          robot.send { room: issues.query.room, event: issues.eventType },  "New Pull ReOpened\n " + 'The link:  ' + issues.payload.pull_request.url + "\n" + "Reopened:  " + issues.payload.pull_request.open + '\n' +  "Issued By: " + issues.payload.pull_request.user.login + "\n" + "Created_at: " + issues.payload.pull_request.created_at  + "\n" + "For Commit URL: " + issues.payload.pull_request.commits_url
          LATEST_ISSUE =  "New Pull ReOpened\n " +'The link:  ' + issues.payload.pull_request.url + "\n" + "Reopened:  " + issues.payload.pull_request.open + '\n' +  "Issued By: " + issues.payload.pull_request.user.login + "\n" + "Created_at: " + issues.payload.pull_request.created_at  + "\n" + "For Commit URL: " + issues.payload.pull_request.commits_url
         else if issues.payload.action == 'synchronized'
          robot.send { room: issues.query.room, event: issues.eventType },  "New Pull Synchronized\n " +'Merged_at:  ' + issues.payload.pull_request.merged_at + "\n" + "Title:  " + issues.payload.pull_request.title + '\n' +  "Issued By: " + issues.payload.pull_request.user.login + "\n" + "For Commit URL: " + issues.payload.pull_request.commits_url
          LATEST_ISSUE =  "New Pull Synchronized\n " +'The link:  ' + issues.payload.pull_request.url + "\n" + "Merged_at:  " + issues.payload.pull_request.merged_at + '\n' +  "Issued By: " + issues.payload.pull_request.user.login + "\n" + "Created_at: " + issues.payload.pull_request.created_at  + "\n" + "For Commit URL: " + issues.payload.pull_request.commits_url


    robot.on "github-repo-event", (issues) ->
        console.log("issues for Pull request review comment", arguments);
        if issues.eventType == 'pull_request_review_comment'
         robot.send { room: issues.query.room, event: issues.eventType }, "New Pull Request Comment Event\n " + 'The link:  ' + issues.payload.comment.url + "\n" + "Issued By: " + issues.payload.comment.user.login + '\n' + "new comment added:  " + issues.payload.comment.body + "\n"+ "Created_at: " + issues.payload.comment.created_at
         LATEST_ISSUE =  "New Pull Request Comment Event\n " +'The link:  ' + issues.payload.comment.url + "\n" + "Issued By: " + issues.payload.comment.user.login +'\n' + "new comment added:  " + issues.payload.comment.body + '\n'+ "Created_at: " + issues.payload.comment.created_at
