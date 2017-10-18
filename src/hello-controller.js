import Controller from './lib/controller';
import nunjucks from 'nunjucks';

nunjucks.configure('./dist');

function getName(request) {
    let name = {
        fname: 'Kojun',
        lname: 'Terai'
    };
    let nameParts = request.params.name ? request.params.name.split('/') : [];
    name.fname = (nameParts[0] || request.query.fname) || name.fname;
    name.lname = (nameParts[1] || request.query.lname) || name.lname;
    return name;
}

export default class HelloController extends Controller {
    toString(callback) {
        nunjucks.renderString('<p>こんにちは、{{fname}} {{lname}}</p>',
        getName(this.context), (err, html) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, html);
        });
    }
}