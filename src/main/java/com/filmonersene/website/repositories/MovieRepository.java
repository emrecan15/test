package com.filmonersene.website.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.filmonersene.website.entities.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long>{
	boolean existsByImdbId(String ImdbId );
	List<Movie> findTop7ByOrderByCreatedAtDesc();

}
