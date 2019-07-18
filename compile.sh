arduino-builder \
-compile \
-verbose=false \
-hardware /usr/share/arduino/hardware \
-build-path=/opt/BS-localAgent/build \
-tools /usr/share/arduino/hardware/tools \
-tools /opt/BS-localAgent/builder/tools-builder \
-libraries=/opt/BS-localAgent/builder/libraries \
-fqbn=arduino:avr:LilyPadUSB /opt/BS-localAgent/sketch/sketch.ino