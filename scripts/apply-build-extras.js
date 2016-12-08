module.exports = function(context) {
  var fs = require('fs');
  var path = require('path');

  let unityProperties = readProjectProperties(path.join(context.opts.plugin.dir, 'unity', 'android', 'Unity', 'project.properties'));
  let libNames = unityProperties.libs.map(proj => proj.split('/').pop());

  let dependencies = '';
  libNames.forEach(lib => {
    process.stdout.write('lib name: ' + lib);
    dependencies += '    compile(name:\'' + lib + '\', ext:\'aar\')\n';

    // Copy the AAR into the android project.
    let srcPath = path.join(context.opts.plugin.dir, 'unity', 'android', 'Unity', 'libs', lib + '.aar');
    let destPath = path.join('platforms', 'android', 'libs', lib + '.aar');
    let data = fs.readFileSync(srcPath);
    fs.writeFileSync(destPath, data);
  });
  let gradleExtras = 'dependencies {\n' + dependencies + '}';
  process.stdout.write(gradleExtras);

  let projectProperties = readProjectProperties(path.join('platforms', 'android', 'project.properties'));
  let subprojectPath = projectProperties.libs.find(elem => elem.includes('cordova2unity'));
  if (subprojectPath !== undefined) {
    let outputPath = path.join('platforms', 'android', subprojectPath, 'build-extras.gradle');

    fs.writeFileSync(outputPath, gradleExtras, 'utf8');
  }
}

/// Utility for parsing project.properties files within android projects.
///
/// Blatantly stolen from the Cordova project. This is necessary because the project.properties
/// files is the only place that knows the path to the plugin source, so we need to parse it to
/// avoid hardcoding. The path would be something like `cordova2unity/foo-Unity`, where "foo" is
/// not entirely clear (maybe it's the name of the proejct, maybe it's the last segment of the
/// bundle ID, but whatever it is it changes between products).
function readProjectProperties(path) {
    function findAllUniq(data, r) {
        var s = {};
        var m;
        while ((m = r.exec(data))) {
            s[m[1]] = 1;
        }
        return Object.keys(s);
    }

    var data = fs.readFileSync(path, 'utf8');
    return {
        libs: findAllUniq(data, /^\s*android\.library\.reference\.\d+=(.*)(?:\s|$)/mg),
        gradleIncludes: findAllUniq(data, /^\s*cordova\.gradle\.include\.\d+=(.*)(?:\s|$)/mg),
        systemLibs: findAllUniq(data, /^\s*cordova\.system\.library\.\d+=(.*)(?:\s|$)/mg)
    };
};
