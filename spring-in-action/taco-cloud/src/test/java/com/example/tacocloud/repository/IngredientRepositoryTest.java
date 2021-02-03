package com.example.tacocloud.repository;

import com.example.tacocloud.model.Ingredient;
import com.example.tacocloud.model.Ingredient.Type;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@Sql({"classpath:test-data.sql"})
public class IngredientRepositoryTest {

    @Autowired
    private IngredientRepository ingredientRepository;

    @Test
    public void testFindAll() {
        List<Ingredient> ingredients = new ArrayList<>();
        ingredientRepository.findAll().forEach(i -> ingredients.add(i));

        assertEquals(5, ingredients.size());
    }

    @Test
    public void testFindOne() {
        Ingredient foundIngredientFLTO = ingredientRepository.findById("FLTO").get();
        assertEquals("Flour Tortilla", foundIngredientFLTO.getName());
        assertEquals(Type.WRAP, foundIngredientFLTO.getType());

        Ingredient foundIngredientGRBF = ingredientRepository.findById("GRBF").get();
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
