
const fs = require('fs');


var empty=''
empty=fs.readFileSync('./list.json', 'utf8')

if (empty==='')
            fs.writeFile('./list.json', '{"liste":[]}', function (err)
            {
            if (err)
                console.error(err)
             })


        var title = process.argv[4];
        var body = process.argv[6];
        var obj = {title: title, body: body};


        var newTab = []


        if (process.argv[2] === 'add' && (process.argv[3] === '--title'
            || process.argv[3] === '-t') && (process.argv[5] === '--body' ||
            process.argv[5] === '-b')) {
            fs.readFile('./list.json', 'utf8', function (err, data) {
                if (err)
                    console.log(err)

                var obj1 = JSON.parse(data)
                var foundTest = false
                var p=0;
                for (let i = 0; i < obj1.liste.length; i++) {
                    if (obj1.liste[i].title === process.argv[4]) {
                        foundTest = true
                        p=i;
                        break;
                    }
                }
                if (foundTest === true)
                    console.log(` Used Title \n ----- \n title: ${obj1.liste[p].title} \n body: ${obj1.liste[p].body}`)
                else {
                    newTab = newTab.concat(obj1.liste, obj)

                    let obj2 = {liste: newTab}
                    var l = JSON.stringify(obj2)
                    // var str = l.join('')

                    fs.writeFile('./list.json', l, function (err) {
                        if (err)
                            console.error(err)
                        console.log(`Note created \n ----- \n title: ${title} \n body: ${body}`)

                    })


                }
            })
        }
        else if (process.argv[2] === 'list') {
            fs.readFile('./list.json', 'utf8', function (err, data) {
                var obj3 = JSON.parse(data)
                if (obj3.liste.length === 0)
                    console.log(` Printing ${obj3.liste.length} note(s).`)
                else
                    console.log(`Printing ${obj3.liste.length} note(s). \n ----- \n `)
                    for (let i=0;i<obj3.liste.length;i++)
                    console.log(` title: ${obj3.liste[i].title} \n body: ${obj3.liste[i].body} \n --- \n`)
            })
        }
        else if (process.argv[2] === 'read' && (process.argv[3] === '--title'
            || process.argv[3] === '-t')) {

            fs.readFile('./list.json', 'utf8', function (err, data) {
                let obj4 = JSON.parse(data)
                var testFound2 = false
                var j = 0
                for (let i = 0; i < obj4.liste.length; i++) {
                    if (obj4.liste[i].title === process.argv[4]) {
                        testFound2 = true
                        j = i
                        break;
                    }
                }
                if (testFound2 === true)
                    console.log(` Note found \n ----- \n title: ${obj4.liste[j].title} \n body: ${obj4.liste[j].body}`)
                else
                    console.log(" note not found")


            })
        }
        else if (process.argv[2] === 'read' && (process.argv[3] !== '--title' || process.argv[3] !== '-t')) {
            console.log(` list.json read \n ----- \n options: \n --help         show help                       [boolean] \n` +
                ' --title, -t    Title of note                   [required] \n' +
                ' Missing required arguments: title')
        }
        else if (process.argv[2] === 'remove' && (process.argv[3] === '--title' || process.argv[3] === '-t')) {


            fs.readFile('./list.json', 'utf8', function (err, data) {
                if (err)
                    console.log(err)

                var obj5 = JSON.parse(data)
                if (obj5.liste.length===0)
                    console.log('Empty File')
                else {
                    let foundTest1 = false
                    let k = 0;
                    for (let i = 0; i < obj5.liste.length; i++) {
                        if (obj5.liste[i].title === process.argv[4]) {
                            foundTest1 = true
                            k = i;
                            break;
                        }
                    }
                    if (foundTest1 === false)
                        console.log(`Title don't exist`)
                    else {
                        newTab = obj5.liste.filter((el, i) => i !== k)


                        let obj6 = {liste: newTab}
                        let l1 = JSON.stringify(obj6)


                        fs.writeFile('./list.json', l1, function (err) {
                            if (err)
                                console.error(err)
                            console.log(`Note was removed`)

                        })


                    }
                }
            })


        }
        else if (process.argv[2] === 'remove' && (process.argv[3] !== '--title' || process.argv[3] !== '-t')) {
            console.log(` list.json remove \n ----- \n options: \n --help         show help                       [boolean] \n` +
                ' --title, -t    Title of note                   [required] \n' +
                ' Missing required arguments: title')
        }
        else {

            return console.log(' options: \n --help         show help                       [boolean] ' +
                '\n --title, -t    Title of note                   [required] ' +
                '\n --body, -b     Body of note                    [required] ' +
                '\n Missing required arguments: title, body')
        }

