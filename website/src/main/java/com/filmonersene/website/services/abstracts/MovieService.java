package com.filmonersene.website.services.abstracts;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;

import com.filmonersene.website.dtos.request.SaveMovieRequest;
import com.filmonersene.website.dtos.response.GetLatest7MoviesResponse;
import com.filmonersene.website.dtos.response.SaveMovieResponse;
import com.filmonersene.website.entities.User;

public interface MovieService {
	SaveMovieResponse saveMovie(SaveMovieRequest saveMovieRequest,User user);
	List<GetLatest7MoviesResponse> getLatest7Movies(UserDetails userDetails, String guestId);
	ResponseEntity<?> voteMovie(Long movieId, UserDetails userDetails, String guestId, boolean isLike);
}
