# Security Policy

## Reporting a vulnerability

Report privately through GitHub: **Security → Report a vulnerability** on this repository (GitHub Private Vulnerability Reporting). Do not open public issues, PRs or discussions about vulnerabilities.

Please include: affected component and version, steps to reproduce, impact, and any suggested fix.

We aim to acknowledge reports within 7 days. This is a goal of a small volunteer project, not a guarantee.

## Supported versions

Only the latest stable release receives security fixes. Nothing has been released yet.

## Process

1. A maintainer triages the report in a private security advisory.
2. The fix is developed in the advisory's private fork, never in a public branch.
3. A maintainer approves, publishes the advisory and releases the fix.
4. Reporters are credited unless they ask not to be.

## What VEYRA's security covers

- **Covered:** integrity of official downloads (signed manifest + SHA-256 per file, verified before every launch), protection of Microsoft tokens at rest (OS secure storage), isolation of the launcher UI from the system (the UI only calls the launcher's own commands), hardening of the build and release pipeline.
- **Not covered:** malware running as the same OS user, and users modifying their own client. VEYRA is not anti-cheat. Its "official mode" label only tells the user whether the files match what VEYRA published.
