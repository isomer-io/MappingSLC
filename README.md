![Mapping SLC Logo](http://www.mappingslc.org/images/mapping.png)


## Mapping Salt Lake City

[Mapping Salt Lake City](http://www.mappingslc.org) is a community-created archive of Salt Lake City’s neighborhoods and people that documents the city’s changes through art, critical and creative literature, personal maps and multi-media projects.We invite people to engage with and evolve this site by [submitting their own contributions](http://www.mappingslc.org/component/rsform/form/4-mapping-slc-project-submission).

We invite people to engage with and evolve this site by submitting their own contributions--both [stories](http://www.mappingslc.org/projects) and [technical/programming expertise](https://github.com/CodeHubGit/MappingSLC).

## Workflow for contributing to this project

First, you need to fork the main mapping SLC repository.

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
git rebase upstream/master
```

Now, we can apply our changes on top of the changes from upstream. We do this by rebasing.

Once this is done, we need to

```
git add -u (or -A)
```

All of our changes and then

```
git commit -m 'Message text goes here!'
```

Those changes. Now we can do a 

```
git push
```

And our changes will be push up from our local branch to our origin.
From there, we can do a pull request on the git hub website from the origin
to the upstream!

