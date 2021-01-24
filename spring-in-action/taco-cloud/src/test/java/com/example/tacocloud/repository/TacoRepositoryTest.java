package com.example.tacocloud.repository;

import com.example.tacocloud.model.Ingredient;
import com.example.tacocloud.model.Taco;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.jdbc.Sql;

import java.util.ArrayList;
import java.util.List;

@JdbcTest
@Sql({"classpath:schema.sql", "classpath:test-data.sql"})
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TacoRepositoryTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private TacoRepository tacoRepository;

    private IngredientRepository ingredientRepository;

    @BeforeAll
    public void setup() {
        this.tacoRepository = new JdbcTacoRepository(jdbcTemplate);
        this.ingredientRepository = new JdbcIngredientRepository(jdbcTemplate);
    }

    @Test
    public void testSave() {
        Taco taco = new Taco();
        taco.setName("test taco");

        List<Ingredient> ingredients = new ArrayList<>();
        ingredients.add(ingredientRepository.findOne("FLTO"));
        ingredients.add(ingredientRepository.findOne("GRBF"));
        taco.setIngredients(ingredients);
        Taco savedTaco = tacoRepository.save(taco);

        Assertions.assertEquals(taco.getName(), savedTaco.getName());
        Assertions.assertEquals(taco.getIngredients(), savedTaco.getIngredients());
    }
}
