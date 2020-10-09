# Contents
* [Technical requirements](#Technical-requirements)
* [Introducing JHipster](#Introducing-JHipster)
* [Installing JHipster](#Installing-JHipster)
* [Creating an application](#Creating-an-application)
* [Entity creation](#Entity-creation)
* [Showing the national gross domestic product](#Showing-the-national-gross-domestic-product)
* [Other JHipster features](#Other-JHipster-features)

## Technical requirements
## Introducing JHipster
JHipster는 간략하게 설명하면 ```코드 생성 도구```라고 할 수 있다. 웹 애플리케이션 개발 플랫폼으로 다양한 개발, 빌드, 테스트 그리고 배포 프레임워크 또는 플랫폼 도구를 지원한다.
백엔드는 Spring Framework, 프론트엔드는 Angular, React 그리고 Vue.js (서드파티) 나아가 데브옵스까지 개발자가 소프트웨어 개발을 위해 구성해야 하는 부분을 간소화할 수 있게 한다. 

지원하는 기술들 (```표시```는 내가 주로 사용했던 것들)
* Build tool: ```Maven```, Gradle
* Development platform: ```Spring Framework```
* Security framework: Spring Security
* Templating: Thymeleaf
* Microservices: Netflix OSS
* RDBMS: ```H2```, MySQL, Oracle, ```PostgreSQL```, MS SQL, MariaDB
* Data streaming: ```Kafka```
* DB tracker: Liquibase
* NoSQL: MongoDB, Cassandra, Couchbase, Hazelcast
* Cache implementation: Infinispan, Ehcache
* Search engine: ELK(Elasticsearch, Logstash, and Kibana) stack
* Monitoring: Prometheus
* ORM: Hibernate
* Testing framework: Cucumber, Browsersync, Jest, Protractor test
* Load testing: Gatling
* UI: Bootstrap, HTML5, CSS3, SaaS, Redux
* JavaScript framework: Angular, Typescript, React, Webpack
* Deployment: ```Docker```, ```Kubernetes```, Boxfuse, Rancher
* CLoud support: Heroku, Cloud Foundry, AWS, OpenShift
* CI/CD: ```Jenkins```, Travis CI, GitLab CI, CircleCI 

JHipster를 사용하면 프론트엔드 ~ 백엔드 그리고 배포까지 반복되는 작업들을 손쉽게 구성할 수 있다. 예를 들어서 프론트엔드와 백엔드 사이에 데이터베이스 저장을 위한 데이터가 있으면 데이터에
대해 필수적으로 작성해야 하는 코드들을 프론트엔드 ~ 백엔드 사이에 JHipster를 이용해 구성한 프레임워크에 대한 boilerplate 코드로 자동 생성해준다. 그리고 개발자는 데이터에 대한 비지니스
로직만 추가함으로써 생산성을 높일 수 있다. 기본적으로 생성된 코드는 ```best practice```를 따르고 있다고 한다. 나아가서 완성한 코드에 대해서 배포에 대해서도 다양한 플랫폼을 지원하도록 
하고 있어 개발에 있어서 필요한 대부분 작업을 JHipster를 통해 아낄 수 있다.
> 물론 JHipster가 생성해주는 코드에 대해 알아야 한다는 ```learning curve```는 존재하지만, 유려한 디자인까지는 아니더라도 프론트엔드까지 개발하는 능력을 갖추고 싶다는 욕심을 기반으로
>스터디를 하는 입장에서 ```best practice```를 따르고 있고 다양한 기술들을 포함하고 있는 부분에서 ```learning curve```를 감안해도 흥미롭게 학습할 수 있는 도구라고 생각한다.


## Installing JHipster
## Creating an application
## Entity creation
## Showing the national gross domestic product
## Other JHipster features

# worldgdp

This application was generated using JHipster 6.10.1, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v6.10.1](https://www.jhipster.tech/documentation-archive/v6.10.1).

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

```
npm install
```

We use npm scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

```

./mvnw


npm start
```

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.

### PWA Support

JHipster ships with PWA (Progressive Web App) support, and it's turned off by default. One of the main components of a PWA is a service worker.

The service worker initialization code is commented out by default. To enable it, uncomment the following code in `src/main/webapp/index.html`:

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function () {
      console.log('Service Worker Registered');
    });
  }
</script>
```

Note: [Workbox](https://developers.google.com/web/tools/workbox/) powers JHipster's service worker. It dynamically generates the `service-worker.js` file.

### Managing dependencies

For example, to add [Leaflet][] library as a runtime dependency of your application, you would run following command:

```
npm install --save --save-exact leaflet
```

To benefit from TypeScript type definitions from [DefinitelyTyped][] repository in development, you would run following command:

```
npm install --save-dev --save-exact @types/leaflet
```

Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:
Edit [src/main/webapp/app/vendor.ts](src/main/webapp/app/vendor.ts) file:

```
import 'leaflet/dist/leaflet.js';
```

Edit [src/main/webapp/content/scss/vendor.scss](src/main/webapp/content/scss/vendor.scss) file:

```
@import '~leaflet/dist/leaflet.css';
```

Note: There are still a few other things remaining to do for Leaflet that we won't detail here.

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

### Using Angular CLI

You can also use [Angular CLI][] to generate some custom client code.

For example, the following command:

```
ng generate component my-component
```

will generate few files:

```
create src/main/webapp/app/my-component/my-component.component.html
create src/main/webapp/app/my-component/my-component.component.ts
update src/main/webapp/app/app.module.ts
```

## Building for production

### Packaging as jar

To build the final jar and optimize the worldgdp application for production, run:

```

./mvnw -Pprod clean verify


```

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

```

java -jar target/*.jar


```

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

```

./mvnw -Pprod,war clean verify


```

## Testing

To launch your application's tests, run:

```
./mvnw verify
```

### Client tests

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

```
npm test
```

For more information, refer to the [Running tests page][].

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

You can run a Sonar analysis with using the [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) or by using the maven plugin.

Then, run a Sonar analysis:

```
./mvnw -Pprod clean verify sonar:sonar
```

If you need to re-run the Sonar phase, please be sure to specify at least the `initialize` phase since Sonar properties are loaded from the sonar-project.properties file.

```
./mvnw initialize sonar:sonar
```

For more information, refer to the [Code quality page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a mysql database in a docker container, run:

```
docker-compose -f src/main/docker/mysql.yml up -d
```

To stop it and remove the container, run:

```
docker-compose -f src/main/docker/mysql.yml down
```

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

```
./mvnw -Pprod verify jib:dockerBuild
```

Then run:

```
docker-compose -f src/main/docker/app.yml up -d
```

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 6.10.1 archive]: https://www.jhipster.tech/documentation-archive/v6.10.1
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v6.10.1/development/
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v6.10.1/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v6.10.1/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v6.10.1/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v6.10.1/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v6.10.1/setting-up-ci/
[node.js]: https://nodejs.org/
[yarn]: https://yarnpkg.org/
[webpack]: https://webpack.github.io/
[angular cli]: https://cli.angular.io/
[browsersync]: https://www.browsersync.io/
[jest]: https://facebook.github.io/jest/
[jasmine]: https://jasmine.github.io/2.0/introduction.html
[protractor]: https://angular.github.io/protractor/
[leaflet]: https://leafletjs.com/
[definitelytyped]: https://definitelytyped.org/
