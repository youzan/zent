#!/bin/sh

RED='\033[0;31m'

fail () {
    printf "${RED}$@\nAborting\n"
    exit -1
}

check_error () {
    if [ $? -ne 0 ]; then
        fail "$@"
    fi
}

command_exists () {
    type "$1" >/dev/null 2>&1
}

npm_major_version () {
    npm --version | cut -d. -f1
}

npm_install () {
    echo "Install $@"
    if command_exists yarn ; then
        yarn global add "$@"
    else
        npm install -g "$@"
    fi
    check_error "Install $@ failed"
}

brew_install () {
    echo "Install $@"
    brew install "$@"
    check_error "Install $@ failed."
}

fontforge_python_extension_loaded () {
    python -c "import fontforge" >/dev/null 2>&1
}

check_xcodebuild () {
    xcodebuild -version >/dev/null 2>&1
    check_error 'xcodebuild not found.\nInstall Xcode from AppStore.'
}

if [[ "$OSTYPE" != "darwin"* ]]; then
    fail 'This script is indended for OSX, please manually install dependencies on other platforms.'
fi

check_xcodebuild

if ! command_exists node ; then
    fail 'node.js is required, please install node first.\nhttps://github.com/creationix/nvm is the recommended way to manage node versions.'
fi

if ! command_exists npm ; then
    fail 'npm not found.\nTry reinstalling your node.js.'
fi

if ! command_exists yarn ; then
    if [ `npm_major_version` -lt "3" ] ; then
        fail 'Requires npm >= 3. Please upgrade your npm.'
    fi
fi

if ! command_exists zent-kit ; then
    npm_install zent-kit
fi

if ! command_exists felint ; then
    npm_install felint
fi

if ! command_exists iconfount ; then
    npm_install iconfount
fi

if ! command_exists brew ; then
    echo 'install homebrew...'
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    check_error 'install homebrew failed'
fi

echo 'brew update, it may take a while...'
brew update
check_error 'brew update failed'

if ! command_exists jq ; then
    brew_install jq
fi

if ! command_exists ttfautohint ; then
    brew_install ttfautohint
fi

if ! command_exists python ; then
    brew_install python
else
    pythonUserSitePackageDir=`python -c "import site; print(site.getusersitepackages())"`
    mkdir -p $pythonUserSitePackageDir

    homebrewPythonPathFile=$pythonUserSitePackageDir/homebrew.pth
    if [ ! -f $homebrewPythonPathFile ]; then
        echo "Add homebrew python site package to python..."
        set -v
        echo "$(brew --prefix)/lib/$(python -c 'import sys; print("python{}.{}".format(*sys.version_info[:2]))')/site-packages" > $homebrewPythonPathFile
        set +v
        check_error 'failed to add homebrew python site package to your python'
    fi
fi

if ! fontforge_python_extension_loaded ; then
    brew_install fontforge
fi;

if ! fontforge_python_extension_loaded ; then
    fail 'fontforge python extension install failed.\nPlease check this faq: http://github.com/youzan/iconfount/blob/master/doc/fontforge.md.';
fi

if ! command_exists sketchtool ; then
    if [ ! -f /Applications/Sketch.app/Contents/Resources/sketchtool/install.sh ]; then
        fail 'sketchtool is required for building icon font. Please follow the instructions here: https://www.sketchapp.com/tool/'
    else
        echo 'Installing sketchtool...'
        /Applications/Sketch.app/Contents/Resources/sketchtool/install.sh
        check_error 'Install sketchtool failed'
    fi
fi
