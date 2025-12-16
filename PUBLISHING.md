# Publishing @sifxt/math-utils to npm

## Prerequisites

1. You need an npm account. If you don't have one:

    - Go to https://www.npmjs.com/signup
    - Create an account

2. Login to npm from your terminal:
    ```bash
    npm login
    ```
    Enter your npm username, password, and email when prompted.

## Publishing Steps

### First Time Publishing

1. **Verify you're logged in:**

    ```bash
    npm whoami
    ```

    This should display your npm username.

2. **Check if the package name is available:**

    ```bash
    npm search @sifxt/math-utils
    ```

    If nothing shows up, the name is available!

3. **Publish the package:**

    ```bash
    cd /Users/apple/projects/math-utils
    npm publish --access public
    ```

    Note: The `--access public` flag is required for scoped packages (@sifxt/...) to be publicly available.

### Updating the Package (Future Releases)

1. **Make your changes** to the code

2. **Update the version** in `package.json`:

    - Patch (bug fixes): `1.0.0` → `1.0.1`
    - Minor (new features): `1.0.0` → `1.1.0`
    - Major (breaking changes): `1.0.0` → `2.0.0`

    Or use npm's version command:

    ```bash
    npm version patch  # for 1.0.0 → 1.0.1
    npm version minor  # for 1.0.0 → 1.1.0
    npm version major  # for 1.0.0 → 2.0.0
    ```

3. **Commit and push** the version change:

    ```bash
    git push && git push --tags
    ```

4. **Publish** the new version:
    ```bash
    npm publish
    ```

## After Publishing

Once published, your package will be available at:

-   npm page: https://www.npmjs.com/package/@sifxt/math-utils
-   Install command: `npm install @sifxt/math-utils`

## Troubleshooting

### "You must verify your email before publishing"

-   Check your email and verify your npm account
-   Or visit: https://www.npmjs.com/settings/[your-username]/email

### "You do not have permission to publish"

-   Make sure you're logged in: `npm whoami`
-   Make sure you have rights to publish under the @sifxt scope

### "Package name too similar to existing package"

-   You may need to choose a different package name
-   Or publish without the scope: `math-utils` instead of `@sifxt/math-utils`

## Pre-publish Checklist

Before running `npm publish`, verify:

-   [ ] All tests pass (if you have tests)
-   [ ] Version number is updated
-   [ ] README.md is up to date
-   [ ] CHANGELOG is updated (if you have one)
-   [ ] All changes are committed to git
-   [ ] Code is pushed to GitHub
-   [ ] You're logged into npm (`npm whoami`)
-   [ ] Build succeeded (`npm run build`)

## Package Contents

What gets published (defined by `files` in package.json):

-   ✅ `dist/` folder (compiled JavaScript + TypeScript definitions)
-   ✅ `README.md`
-   ✅ `LICENSE`
-   ✅ `package.json`

What does NOT get published (excluded by `.npmignore`):

-   ❌ Source TypeScript files (`*.ts`)
-   ❌ Tests
-   ❌ Configuration files
-   ❌ node_modules

You can preview what will be published:

```bash
npm pack --dry-run
```
