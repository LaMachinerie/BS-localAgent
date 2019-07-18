./builder/arduino-builder \
-compile \
-hardware /usr/share/arduino/hardware \
-tools /usr/share/arduino/hardware/tools/avr \
-tools /opt/BS-localAgent/builder/ \
-build-path=/opt/BS-localAgent/build \
-tools /opt/BS-localAgent/builder/tools \
-libraries=/opt/BS-localAgent/builder/libraries \
-fqbn=arduino:avr:LilyPadUSB /opt/BS-localAgent/sketch/sketch.ino