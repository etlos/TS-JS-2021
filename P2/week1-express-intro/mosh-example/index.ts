import Joi from 'joi';
import express from 'express';
const app = express();

app.use(express.json());

interface ICourse {
    id: number
    name: string
}

const courses = [
    { id: 1, name : 'course1'},
    { id: 2, name : 'course2'},
    { id: 3, name : 'course3'},
]

app.get('/',(req,res) => {
    res.send('Hello world')
});

app.get('/api/courses',(req,res) => {
    res.send(courses)
});


app.get('/api/courses/:id',(req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found.')
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if(error){
        res.status(400).send(error);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found.')

    const { error } = validateCourse(req.body);
    if(error){
        res.status(400).send(error);
        return;
    }

    if(course)course.name = req.body.name;
    res.send(course)
    // Update course
    // Return the updated course
})


function validateCourse(course:any) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.valid(course, schema)
}


const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`))