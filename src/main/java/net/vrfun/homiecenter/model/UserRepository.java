package net.vrfun.homiecenter.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface UserRepository extends CrudRepository<HomieCenterUser, Long> {

    Optional<HomieCenterUser> findByUserName(String username);
}
