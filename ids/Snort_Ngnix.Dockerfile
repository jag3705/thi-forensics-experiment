FROM ciscotalos/snort3
USER root

# Install nginx for traffic forwarding due to docker bridge network
# not exposing all usual traffic to every container of a network
RUN apt update --allow-releaseinfo-change -y && apt install nginx -y
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

COPY snort.lua /home/snorty/snort3/etc/snort/snort.lua
COPY demo.rules /home/snorty/snort3/etc/rules/demo.rules

# Install latest community rules
#RUN curl -L https://www.snort.org/downloads/community/snort3-community-rules.tar.gz | tar zx
#RUN cp snort3-community-rules/snort3-community.rules /home/snorty/snort3/etc/rules/snort3-community.rules


# Validate config
RUN /home/snorty/snort3/bin/snort -T -c /home/snorty/snort3/etc/snort/snort.lua


COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
#CMD ["/home/snorty/snort3/bin/snort", "-c", "/home/snorty/snort3/etc/snort/snort.lua", "-Q", "--daq", "afpacket", "-i", "eth0:eth1", "-d", "-l", "/var/log/snort/", "-A", "fast", "-k", "none"]
CMD ["/home/snorty/snort3/bin/snort", "-c", "/home/snorty/snort3/etc/snort/snort.lua", "-i", "eth0:eth1", "-d", "-l", "/var/log/snort/", "-A", "fast", "-k", "none"]