# Contents
## Creating an empty application
```bash
mvn archetype:generate -DgroupId=com.github.hsseo0501.worldgdp \
-DartifactId=worldgdp -Dversion=0.0.1-SNAPSHOT -DarchetypeArtifactId=maven-archetype-webapp
```

## Defining the model classes
Country, City, CountryLanguage 그리고 CountryGDP 모델 추가
모델들에 대해 lombok의 ```@Data```, ```@Getter``` 그리고 ```@Setter``` 애노테이션 추가
* ```@Getter``` 및 ```@Settter``` 애노테이션을 추가함으로써 명시적으로 모델의 프로퍼티에 대한 getter 그리고 setter 메소드를 구현할 필요가 없다.
* ```@Data``` 애노테이션은 @ToString, @EqualsAndHashCode, @Getter / @Setter 그리고 @RequiredArgsConstructor 애노테이션을 포함한다.
> 예제에는 왜 @Data 애노테이션도 추가하고 @Getter / @Setter도 추가한건지? 
* 모델을 선언할 때 lombok을 활용하면 반복적으로 작성해야하는 모델과 관련된 코드들을 애노테이션으로 대체할 수 있다.

### Reference
* lombok - [@Data](https://projectlombok.org/features/Data)

## Defining the data access layer - Spring JDBC Template

## Defining the API controllers

## Deploying to Tomcat

## Defining the view controller

## Defining the view templates

## Logging configuration
 