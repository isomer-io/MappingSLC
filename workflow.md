## Mapping SLC workflow

First, you need to fork your team leads project (Bob or Chris)

Next, you need to clone the project from YOUR GITHUB ACCOUNT

```
git clone <YOUR_GITHUB_REPO>
```

Now, we also need to refer back to the original project that you forked from if we want to pull changes in the future.

```
git remote add upstream <YOUR_UPSTREAM_URL>
```

Cool, so here's the configuration we have:

- A 'local' repository
- An 'origin' repository on your github account
- An 'upstream' repository that is the central repository that we pull changes from.

So, you've added some code on your local master branch. You want to do a pull request with that code don't cha?

```
git fetch upstream
```

This pulls all of the changes from upstream onto our local machine so that we can rebase with them.

```
git merge upstream/master
```

Now, we can apply our changes on top of the changes from upstream.
Once this is done, we need to

```
git add -u (or -A)
```

All of our changes and then

```
git commit
```

Those changes. Now we can do a 

```
git push
```

And our changes will be push up from our local branch to our origin.
From there, we can do a pull request on the git hub website from the origin
to the upstream!