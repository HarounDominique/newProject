package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Post;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Post entity.
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("select post from Post post where post.userPost.login = ?#{authentication.name}")
    List<Post> findByUserPostIsCurrentUser();

    default Optional<Post> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Post> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Post> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(value = "select post from Post post left join fetch post.userPost", countQuery = "select count(post) from Post post")
    Page<Post> findAllWithToOneRelationships(Pageable pageable);

    @Query("select post from Post post left join fetch post.userPost")
    List<Post> findAllWithToOneRelationships();

    @Query("select post from Post post left join fetch post.userPost where post.id =:id")
    Optional<Post> findOneWithToOneRelationships(@Param("id") Long id);
}
