package com.example.tacocloud.repository;

import com.example.tacocloud.model.Ingredient;
import com.example.tacocloud.model.Ingredient.Type;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.jdbc.Sql;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@JdbcTest
@Sql({"classpath:schema.sql", "classpath:test-data.sql"})
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class IngredientRepositoryTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private IngredientRepository ingredientRepository;

    @BeforeAll
    public void setup() {
        this.ingredientRepository = new JdbcIngredientRepository(jdbcTemplate);
    }

    @Test
    public void testFindAll() {
        List<Ingredient> ingredients = new ArrayList<>();
        ingredientRepository.findAll().forEach(i -> ingredients.add(i));

        assertEquals(5, ingredients.size());
    }

    @Test
    public void testFindOne() {
        Ingredient foundIngredientFLTO = ingredientRepository.findOne("FLTO");
        assertEquals("Flour Tortilla", foundIngredientFLTO.getName());
        assertEquals(Type.WRAP, foundIngredientFLTO.getType());

        Ingredient foundIngredientGRBF = ingredientRepository.findOne("GRBF");
        assertEquals("Ground Beef", foundIngredientGRBF.getName());
        assertEquals(Type.PROTEIN, foundIngredientGRBF.getType());
    }

    @Test
    public void testSave() {
        Ingredient ingredient = new Ingredient("TEST", "testName", Type.PROTEIN);
        Ingredient savedIngredient = ingredientRepository.save(ingredient);

        Assertions.assertEquals(ingredient.getId(), savedIngredient.getId());
        Assertions.assertEquals(ingredient.getName(), savedIngredient.getName());
        Assertions.assertEquals(ingredient.getType(), savedIngredient.getType());
    }

}
