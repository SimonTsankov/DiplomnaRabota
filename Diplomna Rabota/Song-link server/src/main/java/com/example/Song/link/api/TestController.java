package com.example.Song.link.api;

import com.example.Song.link.model.TestModel;
import com.example.Song.link.repository.TestRepository;
import org.hibernate.annotations.SQLInsert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")

public class TestController {

    @Autowired
    TestRepository testRepository;

    @GetMapping(value = "/test")
    @ResponseBody
    public ResponseEntity<?> test(){
        return ResponseEntity.ok().body("Test");
    }

    @RequestMapping(value="/save", method = {RequestMethod.POST, RequestMethod.PUT})
    public ResponseEntity<?> save(@RequestParam String name){
        testRepository.save(new TestModel(name));
        return ResponseEntity.ok().body("Added");
    }
    @DeleteMapping(value = "/delete")
    public ResponseEntity<?> delete(@RequestParam long id){
        testRepository.deleteById(id);
        return ResponseEntity.ok().body("Deleted!");
    }
}
