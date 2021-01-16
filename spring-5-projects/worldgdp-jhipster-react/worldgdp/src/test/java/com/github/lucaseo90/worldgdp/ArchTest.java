package com.github.lucaseo90.worldgdp;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.github.lucaseo90.worldgdp");

        noClasses()
            .that()
                .resideInAnyPackage("com.github.lucaseo90.worldgdp.service..")
            .or()
                .resideInAnyPackage("com.github.lucaseo90.worldgdp.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.github.lucaseo90.worldgdp.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
