package com.filmonersene.website.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserRequest {
		
	
	@NotBlank(message = "Kullanıcı adı boş olamaz")
	private String username;
	
	@NotBlank(message = "İsim boş olamaz")
	private String name;
	@NotBlank(message = "Soyisim boş olamaz")
	private String surname;
	
	@NotBlank(message = "Email boş olamaz")
    @Email(message = "Geçerli bir email giriniz")
	private String email;
	

    @NotBlank(message = "Şifre boş olamaz")
    @Size(min = 6, message = "Şifre en az 6 karakter olmalı")
	private String password;
	
	
}
