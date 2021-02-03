package com.example.tacocloud.repository;

import com.example.tacocloud.model.Ingredient;
import com.example.tacocloud.model.Taco;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

import java.util.ArrayList;
import java.util.List;

@DataJpaTest
@Sql({"classpath:test-data.sql"})
public class TacoRepositoryTest {

    @Autowired
    private TacoRepository tacoRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Test
    public void testSave() {
        Taco taco = new Taco();
        taco.setName("test taco");

        List<Ingredient> ingredients = new ArrayList<>();
        ingredients.add(ingredientRepository.findById("FLTO").get());
        ingredients.add(ingredientRepository.findById("GRBF").get());
        taco.setIngredients(ingredients);
        Taco savedTaco = tacoRepository.save(taco);

        Assertions.assertEquals(taco.getName(), savedTaco.getName());
        Assertions.assertEquals(taco.getIngredients(), savedTaco.getIngredients());
    }
}
