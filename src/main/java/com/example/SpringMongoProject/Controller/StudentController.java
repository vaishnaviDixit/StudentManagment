package com.example.SpringMongoProject.Controller;

import com.example.SpringMongoProject.Entity.Student;
import com.example.SpringMongoProject.Service.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/student")
public class StudentController {
    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    @Autowired
    private StudentServices studentServices;

    @PostMapping(value="/save")
    private String saveStudent(@RequestBody Student students ) {

        studentServices.saveorUpdate(students);
        return students.get_id();
    }
    @GetMapping("/getAll")
    public List<Student> getAllStudents() {
        List<Student> students = studentServices.getAllStudents();
        logger.info("Fetched Students: {}", students);
        return students;
    }
    @PutMapping(value="/edit/{id}")
    private Student update(@RequestBody Student student, @PathVariable(name = "id") String _id) {

student.set_id(_id);
studentServices.saveorUpdate(student);
        return student;
    }
    @DeleteMapping(value="/delete/{id}")
    private String deleteStudent(@PathVariable(name = "id") String _id) {
        studentServices.deleteStudent(_id);
        return _id;
    }
    @RequestMapping("/search/{id}")
    private Student getStudents(@PathVariable(name = "id") String studentid) {
        return studentServices.getStudentByID(studentid) ;
    }
}
