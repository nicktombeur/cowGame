# CowGame #

## Build & Run ##

```sh
$ cd CowGame
$ ./sbt
> container:start
> browse
```

If `browse` doesn't launch your browser, manually open [http://localhost:8080/](http://localhost:8080/) in your browser.

## Automatic code reloading ##

```sh
$ ./sbt
> container:start
> ~ ;copy-resources;aux-compile
```

# IntelliJ IDEA #

This sbt plugin generates IntelliJ classpath and configuration files to ensure the project will work as expected in the IDE.

```
$ ./sbt
> gen-idea
```

Be sure to re-run ./sbt gen-idea every time you add or update a dependency in project/build.scala.

## Debugging in IntelliJ Idea ##

Start SBT like this:

```sh
./sbt -jvm-debug 5005
```

After that, go to Run -> Edit configurations in IntelliJ. Click the + button, select Remote to make a new remote debugging configuration, and call it Scalatra Debug. In IntelliJ 13, the default run conf should work (it looks like this):

```
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005
```

Now just select Run -> Debug 'Scalatra Debug'. Setting breakpoints and stepping through code should work.