package site.xiaobu.bmschedule;

import cn.hutool.core.util.RuntimeUtil;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.Charset;

@Slf4j
public class CommonTests {

    Charset defaultCharset = Charset.defaultCharset();

    @SneakyThrows
    @Test
    public void test() {
        String command = "ts-node.cmd C:\\Project\\bm-schedule\\example-scripts\\hello.js";
        Process process = RuntimeUtil.exec(command);
        BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream(), defaultCharset));

        String line;
        while ((line = br.readLine()) != null) {
            log.info(line);
        }

        br.close();
    }

    @Test
    public void testPipList() {
        String command = "pip list";
        String result = RuntimeUtil.execForStr(defaultCharset, command);
        log.info(result);
    }
}
