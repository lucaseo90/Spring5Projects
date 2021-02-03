package com.example.tacocloud.repository;

import com.example.tacocloud.model.Ingredient;
import com.example.tacocloud.model.Order;
import com.example.tacocloud.model.Taco;
import org.aspectj.weaver.ast.Or;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@DataJpaTest
@Sql({"classpath:test-data.sql"})
public class OrderRepositoryTest {

    @Autowired
    private TacoRepository tacoRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Test
    public void testSave() {
        Taco taco = new Taco();
        taco.setName("test taco");

        List<Ingredient> ingredients = new ArrayList<>();
        ingredients.add(ingredientRepository.findById("FLTO").get());
        ingredients.add(ingredientRepository.findById("GRBF").get());
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

        Assertions.assertEquals("test taco", savedOrder.getTacos().get(0).getName());
        Assertions.assertEquals(2, savedOrder.getTacos().get(0).getIngredients().size());

        Assertions.assertEquals("Lucas", savedOrder.getDeliveryName());
        Assertions.assertEquals("testStreet", savedOrder.getDeliveryStreet());
        Assertions.assertEquals("testCity", savedOrder.getDeliveryCity());
        Assertions.assertEquals("CA", savedOrder.getDeliveryState());
        Assertions.assertEquals("testZip", savedOrder.getDeliveryZip());
        Assertions.assertEquals("1111211131114111", savedOrder.getCcNumber());
        Assertions.assertEquals("21/02", savedOrder.getCcExpiration());
        Assertions.assertEquals("987", savedOrder.getCcCVV());
    }
}
