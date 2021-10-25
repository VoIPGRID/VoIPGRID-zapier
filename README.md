# VoIPGRID to Zapier
The PLATFORM_URL variable can be used to set a branded url.
For the zapier commands this should be for example: PLATFORM_URL='https://partner.voipgrid.com'.

## Purpose of this app
The purpose of this app is two fold.
One is to see if people are interested in making connections to the VoIPGRID platform.
Two is to see what specific integration people actually are using so that we can make a specific integration.

## Installing on Zapier.com
Installing is actually a breeze once you get comfortable with the `zapier` commands.

### A version bump
You will need to do a version bump in `package.json`
So find the line which says: `"version":` and update the patch level by one.

### Testing a new version
You can run `PLATFORM_URL='https://partner.voipgrid.com' zapier test` to test a
new version before pushing it.

### Building and uploading a new version
To build and push a new version run:
`PLATFORM_URL='https://partner.voipgrid.com' zapier push`

### Promote your new version.
You now have made a new version. Let's go and push that to Zapier
`zapier promote <new-version>`
This will build a .zip file and push it to Zapier.

### Deprecate the old version
Since we have a new version, we want people to stop using the old version and start using the new version.
To do this, deprecate the old version.
`zapier deprecate <version> <YYYY-MM-DD>`
 This tells Zapier to deprecate the `<version>` at date `<YYYY-MM-DD>`

 ### Move users to the new version
 One last this you can do is migrate any current user of your app to the new version.
 `zapier migrate 1.0.0 1.0.1`
 This will take any users running on `1.0.0` and move them to version `1.0.1`.
