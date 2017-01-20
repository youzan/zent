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
    type "$1" >/dev/null 2>&1;
}

npm_major_version () {
    npm --version | cut -d. -f1
}

npm_install () {
    npm --registry=http://registry.npm.qima-inc.com --disturl=http://npm.taobao.org/mirrors/node install -g "$@"
    check_error
}

fontforge_python_extension_loaded () {
    python -c "import fontforge" >/dev/null 2>&1
}

if [[ "$OSTYPE" != "darwin"* ]]; then
    fail 'This script is indended for OSX, please manually install dependencies on other platforms.'
fi

if ! command_exists node ; then
    fail 'node.js is required, please install node first.\nhttps://github.com/creationix/nvm is the recommended way to manage node versions.'
fi

if ! command_exists npm ; then
    fail 'npm not found.\nTry reinstalling your node.js.'
fi

if [ `npm_major_version` -lt "3" ] ; then
    fail 'Requires npm >= 3. Please upgrade your npm.'
fi

if ! command_exists zent-kit ; then
    echo 'Install zent-kit...'
    npm_install @youzan/zent-kit
fi

if ! command_exists felint ; then
    echo 'Installing felint...'
    npm_install @youzan/felint
fi

if ! command_exists fount ; then
    echo 'Installing fount...'
    npm_install @youzan/fount
fi

if ! command_exists superman ; then
    echo 'Installing superman...'
    npm_install @youzan/superman
fi

if ! command_exists lerna ; then
    echo 'Installing lerna...'
    npm_install lerna
fi

if ! command_exists brew ; then
    echo 'install homebrew...'
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    check_error
fi

brew update
check_error

if ! command_exists jq ; then
    echo 'Installing jq with homebrew...'
    brew install jq
    check_error
fi

if ! command_exists ttfautohint ; then
    echo 'Installing ttfautohint with homebrew...'
    brew install ttfautohint
    check_error    
fi

if ! command_exists python ; then
    printf 'Installing python with homebrew...\n'
    brew install python
    check_error    
else
    pythonUserSitePackageDir=`python -c "import site; print(site.getusersitepackages())"`
    mkdir -p $pythonUserSitePackageDir

    homebrewPythonPathFile=$pythonUserSitePackageDir/homebrew.pth
    if [ ! -f $homebrewPythonPathFile ]; then
        echo "Add homebrew python site package to python..."
        echo "$(brew --prefix)/lib/$(python -c 'import sys; print("python{}.{}".format(*sys.version_info[:2]))')/site-packages" > $homebrewPythonPathFile
        check_error
    fi
fi

if ! fontforge_python_extension_loaded ; then
    echo 'Installing fontforge with homebrew...'
    brew install fontforge
    check_error
fi;

if ! fontforge_python_extension_loaded ; then
    fail 'fontforge python extension install failed.\nPlease check this faq: http://gitlab.qima-inc.com/fe/fount/blob/master/doc/fontforge.md.';
fi

if ! command_exists sketchtool ; then
    if [ ! -f /Applications/Sketch.app/Contents/Resources/sketchtool/install.sh ]; then
        fail 'sketchtool is required for building icon font. Please follow the instructions here: https://www.sketchapp.com/tool/'
    else
        echo 'Installing sketchtool...'
        /Applications/Sketch.app/Contents/Resources/sketchtool/install.sh
        check_error
    fi
fi
