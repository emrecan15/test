package com.filmonersene.website.services.abstracts;

import com.filmonersene.website.dtos.request.CreateUserRequest;
import com.filmonersene.website.dtos.response.CreateUserResponse;


public interface UserService {
	CreateUserResponse createUser(CreateUserRequest createUserRequest);
}
