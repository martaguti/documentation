---
title: "Contributing"
description: "Contributing to EGI documentation"
type: docs
weight: 30
---

Thank you for taking the time to contribute to this project. The maintainers
greatly appreciate the interest of contributors and rely on continued engagement
with the community to ensure this project remains useful. We would like to
take steps to put contributors in the best possible position to have their
contributions accepted. Please take a few moments to read this short guide on
how to contribute.

{{% alert title="Note" color="info" %}} Before you start contributing to the
EGI documentation, please familiarize yourself with the [concepts](../concepts)
used by documentation authors. When authoring pages please observe and adhere
to the [Style Guide](style).
{{% /alert %}}

{{% alert title="Tip" color="info" %}} We also welcome contributions
regarding how to contribute easier and more efficiently.
{{% /alert %}}

## Feedback and questions

If you wish to discuss anything related to the project, please open a
[GitHub issue](https://github.com/EGI-Federation/documentation/issues/new) or
start a topic on the [EGI Community Forum](https://community.egi.eu). The
maintainers will sometimes move issues off from GitHub to the community forum if
it is thought that longer, more open-ended discussion would be beneficial,
including a wider community scope.

## Contribution process

All contributions have to go through a review process, and contributions can be
made in two ways:

- For simple contribution you can contribute from your browser by clicking the
  **pencil** `Edit this file` icon shown at the top of a page that you are
  viewing (See
  [GitHub documentation](https://help.github.com/en/github/managing-files-in-a-repository/editing-files-in-another-users-repository)).
  You will be guided through the required steps. Be sure to save your
  changes quickly as the repository may be updated by someone else in the
  meantime.
- For more complex contributions and when you want to preview and test changes
  locally you should fork the repository as documented below in the
  [Using Git and GitHub](git) page.

### Contributing via pull requests

{{% alert title="Note" color="info" %}} If you need to discuss your changes
beforehand, e.g. adding a new section or if you have any doubts, please ask
the maintainers by creating a
[GitHub issue](https://github.com/EGI-Federation/documentation/issues/new).
{{% /alert %}}

Before proposing a contribution via the so-called Pull Request (PR), ideally
there is an [open issue](https://github.com/EGI-Federation/documentation/issues)
describing the need for your contribution (refer to this issue number when you
submit the Pull Request). We have a 3 steps process for contributions.

1. Fork the project if you have not, and commit changes to a git branch.
   Building the documentation locally is described in the
   [README.md](https://github.com/EGI-Federation/documentation/blob/main/README.md).
1. Create a GitHub PR for your change, following the instructions in
   the PR template.
1. Perform a [code review](#code-review-process) with the maintainers on the PR.

### PR requirements

1. If the PR is not finalised mark it as draft using the GitHub web interface,
   so that it's clear it's not yet ready to be reviewed.
1. **Explain your contribution in plain language.** To assist the maintainers in
   understanding and appreciating your pull request, please use the template to
   explain _why_ you are making this contribution, rather than just _what_ the
   contribution entails.

### Code review process

Code review takes place in GitHub pull requests. See
[this article](https://help.github.com/articles/about-pull-requests/) if you're
not familiar with GitHub Pull Requests.

Once you open a pull request, automated checks will verify the style and syntax
of your changes and maintainers will review your code using the built-in code
review process in GitHub Pull Requests.

The process at this point is as follows:

1. Automated syntax and formatting checks are run using
   [GitHub Actions](https://github.com/features/actions), successful checks are
   a hard requirement, but maintainers will help you addressing reported issues.
1. A maintainer will review your code and merge it if no changes are necessary.
   Your change will be merged into the repository's `main` branch.
1. If a maintainer has feedback or questions on your changes then they will set
   `request changes` in the review and provide an explanation.

## Release cycle

The documentation is using a rolling release model, all changes merged to the
`main` branch are directly deployed in the live production environment.

Main branch is always available. Tagged versions may be created as needed
following [semantic versioning](https://semver.org/) as far as applicable.

## Community

EGI benefits from a strong community of developers and system administrators,
and vice-versa. If you have any questions or if you would like to get involved
in the wider EGI community you can check out:

- [EGI Community Forum](https://community.egi.eu/)
- [EGI website](https://www.egi.eu)
