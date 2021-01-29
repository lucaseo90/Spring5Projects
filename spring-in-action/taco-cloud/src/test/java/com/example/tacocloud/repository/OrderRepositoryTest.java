package com.example.tacocloud.repository;

import com.example.tacocloud.model.Ingredient;
import com.example.tacocloud.model.Order;
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
public class OrderRepositoryTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private TacoRepository tacoRepository;

    private IngredientRepository ingredientRepository;

    private OrderRepository orderRepository;

    private Taco savedTaco;

    @BeforeAll
    public void setup() {
        this.tacoRepository = new JdbcTacoRepository(jdbcTemplate);
        this.ingredientRepository = new JdbcIngredientRepository(jdbcTemplate);
        this.orderRepository = new JdbcOrderRepository(jdbcTemplate);
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

        List<Taco> tacos = new ArrayList<>();
        tacos.add(savedTaco);

        Order order = new Order();
        order.setTacos(tacos);

        order.setDeliveryName("Lucas");
        order.setDeliveryStreet("testStreet");
        order.setDeliveryCity("testCity");
        order.setDeliveryState("CA");
        order.setDeliveryZip("testZip");
        order.setCcNumber("1111211131114111");
        order.setCcExpiration("21/02");
        order.setCcCVV("987");

        Order savedOrder = orderRepository.save(order);

        Assertions.assertEquals(1, savedOrder.getTacos().get(0).getId());
        Assertions.assertEquals(1, savedOrder.getId());

        Assertions.assertEquals("Lucas", savedOrder.getDeliveryName());
        Assertions.assertEquals("testStreet", savedOrder.getDeliveryStreet());
        Assertions.assertEquals("testCity", savedOrder.getDeliveryCity());
        Assertions.assertEquals("CA", savedOrder.getDeliveryState());
        Assertions.assertEquals("testZip", savedOrder.getDeliveryZip());
        Assertions.assertEquals("1111211131114111", savedOrder.getCcNumber());
        Assertions.assertEquals("21/02", savedOrder.getCcExpiration());
        Assertions.assertEquals("987", savedOrder.getCcCVV());

        Order secondSavedOrder = orderRepository.save(order);
        Assertions.assertEquals(2, secondSavedOrder.getId());

    }
}
