const yargs =require ('yargs')
const fs=require('fs')



var empty=''
empty=fs.readFileSync('./yargslist.json', 'utf8')

if (empty==='')
    fs.writeFile('./yargslist.json', '{"liste":[]}', function (err)
    {
        if (err)
            console.error(err)
    })







const argv=yargs.command("add","add new note",{
    title:{
        describe:"title of the note",
        alias:'t',
        demandOption:true
    },
    body:{
        describe:"body of the note",
        alias:'b',
        demandOption:true
    }
}).command("list","list all notes",{
    list:{
        describe:'note list',
        alias:'l'
    }
}).command("remove","remove note",{
    title:{
        describe:"remove note",
        alias:'t',
        demandOption:true
    }
}).command("read","Read note",{
    title:{
        describe:"Read note",
        alias:'t',
        demandOption:true
    }
}).help().alias("help","h").argv;


var newTab=[];
    switch (argv._[0]){

        case 'add': {fs.readFile('./yargslist.json', 'utf8', function (err, data) {
        if (err)
            console.log(err);
        let obj={title:argv.title,body:argv.body};
        var obj1 = JSON.parse(data);
        var foundTest = false;
        var p=0
        for (let i = 0; i < obj1.liste.length; i++) {
            if (obj1.liste[i].title === argv.title) {
                foundTest = true;
                p=i;
                break;
            }
        }
        if (foundTest === true)
            console.log(` Used Title \n ----- \n title: ${obj1.liste[p].title} \n body: ${obj1.liste[p].body}`)
        else {
            newTab = newTab.concat(obj1.liste, obj);

            let obj2 = {liste: newTab};
            var l = JSON.stringify(obj2);
            // var str = l.join('')

            fs.writeFile('./yargslist.json', l, function (err) {
                if (err)
                    console.error(err);
                console.log(`Note created \n ----- \n title: ${argv.title} \n body: ${argv.body}`)

            })


        }
    })

        } break;
        case 'list' :{
            fs.readFile('./yargslist.json', 'utf8', function (err, data) {
                var obj3 = JSON.parse(data)
                if (obj3.liste.length === 0)
                    console.log(` Printing ${obj3.liste.length} note(s).`)
                else
                    console.log(`Printing ${obj3.liste.length} note(s). \n ----- \n `)
                for (let i=0;i<obj3.liste.length;i++)
                    console.log(` title: ${obj3.liste[i].title} \n body: ${obj3.liste[i].body} \n --- \n`)
            })

        } break;
        case 'read':{fs.readFile('./yargslist.json', 'utf8', function (err, data) {
            let obj4 = JSON.parse(data)
            var testFound2 = false
            var j = 0
            for (let i = 0; i < obj4.liste.length; i++) {
                if (obj4.liste[i].title === argv.title) {
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

        }break;

        case 'remove' : {


            fs.readFile('./yargslist.json', 'utf8', function (err, data) {
                if (err)
                    console.log(err)

                var obj5 = JSON.parse(data)
                if (obj5.liste.length===0)
                    console.log('Empty File')
                else {
                    let foundTest1 = false
                    let k = 0;
                    for (let i = 0; i < obj5.liste.length; i++) {
                        if (obj5.liste[i].title === argv.title) {
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


                        fs.writeFile('./yargslist.json', l1, function (err) {
                            if (err)
                                console.error(err)
                            console.log(`Note was removed`)

                        })


                    }
                }
            })
         }
            break;


default:console.log('write a command')


}
//fs.appendFileSync('./yargslist.json',`{"title": "${argv.title}", \n "body": "${argv.body}"}`)

