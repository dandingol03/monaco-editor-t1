/**
 * Created by danding on 17/3/20.
 */
/**
 * Created by danding on 17/2/4.
 */
var fork = require('child_process').fork;
var path = require('path');

var onExit = function(child) {
    if (child && !child.killed) {
        child.kill()
    }
}




//desktop gulpfile
var child = fork(path.join(__dirname, './node_modules/.bin/gulp'), ['start'], {
    cwd: path.join(__dirname, './')
})

process.on('exit', onExit.bind(this, child))


