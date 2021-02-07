package com.example.tacocloud.repository.security;

import com.example.tacocloud.model.security.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSave() {
        User user = new User(
                "username", "password", "full name", "street", "city",
                "state", "zip", "phone number");
        User savedUser = userRepository.save(user);

        Assertions.assertEquals(user.getUsername(), savedUser.getUsername());
        Assertions.assertEquals(user.getPassword(), savedUser.getPassword());
        Assertions.assertEquals(user.getFullname(), savedUser.getFullname());
        Assertions.assertEquals(user.getStreet(), savedUser.getStreet());
        Assertions.assertEquals(user.getCity(), savedUser.getCity());
        Assertions.assertEquals(user.getState(), savedUser.getState());
        Assertions.assertEquals(user.getZip(), savedUser.getZip());
        Assertions.assertEquals(user.getPhoneNumber(), savedUser.getPhoneNumber());
    }

    @Test
    public void testFindByUserName() {
        User user = new User(
                "username", "password", "full name", "street", "city",
                "state", "zip", "phone number");
        userRepository.save(user);

        User foundUser = userRepository.findByUsername("username");
        Assertions.assertNotNull(foundUser);
        Assertions.assertEquals(user.getUsername(), foundUser.getUsername());
    }
}
