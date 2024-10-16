package com.auu_sw3_6.Himmerland_booking_software.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.auu_sw3_6.Himmerland_booking_software.api.model.User;

@Service
public class UserService {

  private List<User> userList;

  public UserService() {
    userList = new ArrayList<>();

    User user1 = new User(1, "John Doe", "testmail@gmail.com", "123456");
    User user2 = new User(2, "Jane Smith", "janesmith@gmail.com", "654321");
    User user3 = new User(3, "Alice Johnson", "alicej@gmail.com", "888888888");
    User user4 = new User(4, "Bob Brown", "bobbrown@gmail.com", "999997");

    userList.addAll(Arrays.asList(user1, user2, user3, user4));
  }

  public Optional<User> getUser(Integer id) {
    Optional optional = Optional.empty();
    for (User user : userList) {
      if (user.getId() == id) {
        optional = Optional.of(user);
        return optional;
      }
    }
    return optional;
  }

}
