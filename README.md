# Custom FitBit Clock Face

[![Maintainability](https://api.codeclimate.com/v1/badges/4a16cba0319a5d15ffd1/maintainability)](https://codeclimate.com/github/mvaradi/new-clock-face/maintainability)

This is a small personal project for creating a custom clock face for my FitBit. 

## Basic information

The application builds on the "Digital Clock" template from [FitBit Studio](https://studio.fitbit.com). Note that it is using with SDK version 4.2, as SDK versions 5+ do not support FitBit Versa Lite.

Some of the solutions were based on the [sdk-moment](https://github.com/Fitbit/sdk-moment) repository.

## Usage

1.) Download the repository.
```angular2html
git clone https://github.com/mvaradi/new-clock-face.git
```

2.) Go to [FitBit Studio](https://studio.fitbit.com) and start a new project.

3.) Upload the files to the IDE and test using [FitBit OS Simulator](https://dev.fitbit.com/release-notes/fitbit-os-simulator/).

I found it easier to develop and test the clock face using FitBit Studio and FitBit OS Simulator, in particular because FitBit Versa Lite does not support the "developer bridge", so I could not test easily on my actual device.

## Deploying

1.) Build the app from [FitBit Studio](https://studio.fitbit.com) and download the .fba file.

2.) Upload to the [FitBit Gallery](https://gam.fitbit.com/apps).

3.) Bump the version and update the documentations

The new version should then be available for installation on your device.

## Versioning
I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/mvaradi/new-clock-face/tags).

## Authors
* **Mihaly Varadi** - *Initial work* - [mvaradi](https://github.com/mvaradi)

See also the list of [contributors](https://github.com/mvaradi/new-clock-facegraphs/contributors) who participated in this project.

## License
This project is licensed under the Apache License (version 2.) - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
I would like to thank my wife for helping with the styling of the layout :) I would also think it fair to acknowledge [sdk-moment](https://github.com/Fitbit/sdk-moment) on which some of the code is based.